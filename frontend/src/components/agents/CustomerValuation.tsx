import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  BookOpen,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CustomerValuation() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log("Error fetching students:", err));
  }, []);

  const activeStudent = students.find((s) => s?.id === selectedStudent);

  const addSubject = () => {
    if (!newSubject || !activeStudent) return;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === activeStudent.id
          ? { ...s, subjects: [...s.subjects, newSubject] }
          : s
      )
    );

    setNewSubject("");
  };

  const removeSubject = (subject: string) => {
    if (!activeStudent) return;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === activeStudent.id
          ? { ...s, subjects: s.subjects.filter((sub: string) => sub !== subject) }
          : s
      )
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Student Academic Valuation</h1>
        <p className="text-muted-foreground">
          Evaluasi progress belajar berdasarkan nilai, kehadiran & perilaku akademik.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Students</p>
                <div className="text-2xl font-bold">{students.length}</div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">High Performers</p>
                <div className="text-2xl font-bold">
                  {students.filter((s) => s.ai_evaluation?.includes("kuat") || s.score >= 85).length}
                </div>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Avg Score (Dummy)</p>
                <div className="text-2xl font-bold">
                  {/* Karena backend belum ada score real */}
                  82.5
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Avg Attendance (Dummy)</p>
                <div className="text-2xl font-bold">88%</div>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Performance Overview</CardTitle>
          <CardDescription>
            Klik siswa untuk melihat detail lengkap
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Evaluation</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.subjects.join(", ")}</TableCell>
                  <TableCell>
                    {student.attendance
                      ? `${student.attendance.present}/${student.attendance.absent}`
                      : "No data"}
                  </TableCell>
                  <TableCell>
                    <Badge>{student.ai_evaluation ? "Evaluated" : "Pending"}</Badge>
                  </TableCell>
                  <TableCell>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Selected Student Panel */}
      {activeStudent && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Detail Siswa: {activeStudent.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <h3 className="font-semibold mb-2">Mata Pelajaran</h3>

            <div className="space-y-2 mb-4">
              {activeStudent.subjects?.map((subject: string, i: number) => (
                <div key={i} className="flex justify-between border p-2 rounded">
                  <span>{subject}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeSubject(subject)}
                  >
                    Hapus
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Tambah mata pelajaran..."
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <Button onClick={addSubject}>Tambah</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
