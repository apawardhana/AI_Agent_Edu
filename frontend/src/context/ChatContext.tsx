// frontend/src/context/ChatContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient'; // Path sudah sesuai dengan folder lib

interface Message {
    id: number;
    sender: "user" | "ai";
    text: string;
    timestamp: string;
}

interface QuickStats { 
    activeChats: number; 
    avgResponseTime: string; 
    satisfaction: string; 
}

interface ChatContextType {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    quickStats: QuickStats;
    saveMessageToDb: (message: Message) => Promise<void>;
}

// 💡 Data Quick Stats yang akan dimuat saat aplikasi dijalankan
const defaultStats: QuickStats = { activeChats: 24, avgResponseTime: '8s', satisfaction: '4.9/5' }; 
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Fungsi untuk mendapatkan ID sesi yang ada atau membuat yang baru
const getOrCreateSessionId = () => {
    let id = localStorage.getItem('chat_session_id');
    if (!id) {
        id = crypto.randomUUID(); 
        localStorage.setItem('chat_session_id', id);
    }
    return id;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chatSessionId] = useState(getOrCreateSessionId);
    const [messages, setMessages] = useState<Message[]>([]);
    const [quickStats, setQuickStats] = useState(defaultStats);
    const [isLoaded, setIsLoaded] = useState(false);

    // 💡 FUNGSI UNTUK SIMPAN PESAN BARU KE SUPABASE
    const saveMessageToDb = useCallback(async (message: Message) => {
        if (message.id === 1) return; 
        
        const { error } = await supabase
            .from('chats')
            .insert({
                sender: message.sender,
                text: message.text,
                chat_session_id: chatSessionId, 
            });

        if (error) {
            console.error('Error saving message:', error);
        }
    }, [chatSessionId]);

    // 💡 FUNGSI UNTUK MUAT PESAN LAMA DARI SUPABASE (Persistensi)
    const loadMessages = useCallback(async () => {
        if (isLoaded) return;
        
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('chat_session_id', chatSessionId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error loading chats:', error);
        } 
        
        const initialMessage: Message = {
            id: 1,
            sender: "ai",
            text: "Halo! Saya AI Assistant untuk platform AI Sales Agent. Bagaimana saya bisa membantu Anda hari ini?",
            timestamp: new Date().toLocaleTimeString(),
        };

        if (data && data.length > 0) {
            const loadedMessages: Message[] = data.map((item: any) => ({
                id: item.id,
                sender: item.sender,
                text: item.text,
                timestamp: new Date(item.created_at).toLocaleTimeString(),
            }));
            setMessages(loadedMessages);
        } else {
            setMessages([initialMessage]);
        }
        setIsLoaded(true);
    }, [chatSessionId, isLoaded]);
    
    // 💡 Memuat pesan dan stats saat komponen di-mount
    useEffect(() => {
        loadMessages();
        // loadInitialStats(); // Quick stats menggunakan default stats for now
    }, [loadMessages]);


    return (
        <ChatContext.Provider value={{ messages, setMessages, quickStats, saveMessageToDb }}>
            {children}
        </ChatContext.Provider>
    );
};

// Hook kustom untuk digunakan di CustomerService.tsx
export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};