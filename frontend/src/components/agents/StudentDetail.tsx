import { useEffect, useState } from "react";

export default function StudentDetail({ studentId, onBack }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentId}`)
      .then(res => res.json())
      .then(setData);
  }, [studentId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>⬅ Kembali</button>

      <h1>{data.name} ({data.class})</h1>

      <h3>Mata Pelajaran:</h3>
      <ul>
        {data.subjects.map((sub, i) => <li key={i}>{sub}</li>)}
      </ul>

      <h3>Absensi</h3>
      <p>Hadir: {data.attendance.present} | Alpha: {data.attendance.absent}</p>

      <h3>Nilai</h3>
      <ul>
        {Object.entries(data.grades).map(([mapel, nilai], i) => (
          <li key={i}>{mapel}: {nilai}</li>
        ))}
      </ul>

      <h3>Analisis AI</h3>
      <p style={{ fontStyle: "italic", color: "gray" }}>{data.ai_evaluation}</p>
    </div>
  );
}
