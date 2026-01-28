import { useEffect, useState } from "react";
import { Input } from "./Input";
import {
  addStudies,
  deleteStudies,
  getAllStudies,
} from "../utils/supabaseFunction";

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [isInput, setIsInput] = useState(true);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStudies = async () => {
    setLoading(true);
    const studies = await getAllStudies();
    setRecords(studies.data);
    setLoading(false);
  };

  useEffect(() => {
    getStudies();
  }, []);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTimeChange = (e) => {
    setTime(e.target.value);
  };

  const onAddButtonClick = async () => {
    if (title === "" || time <= 0) {
      setIsInput(false);
      return;
    }
    setIsInput(true);

    // DBに登録 & uuidを取得
    const insertedRecord = await addStudies(title, time);

    // そのまま state に追加
    setRecords((prev) => [...prev, insertedRecord]);

    setTitle("");
    setTime(0);
  };

  const sumTime = records.reduce(
    (sum, record) => sum + Number(record.time || 0),
    0
  );

  const onDeleteButtonClick = async (id) => {
    await deleteStudies(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // ローディング中
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>学習記録一覧</h1>
      <Input
        title={title}
        time={time}
        onTitleChange={onTitleChange}
        onTimeChange={onTimeChange}
      />

      {records.map((record) => (
        <li
          key={record.id ?? `${record.title}-${record.time}`}
          data-testid="study-item"
        >
          {record.title} {record.time}時間
          <button onClick={() => onDeleteButtonClick(record.id)}>削除</button>
        </li>
      ))}

      <button onClick={onAddButtonClick}>登録</button>
      {!isInput && <p>入力されていない項目があります</p>}
      <p>
        合計時間：
        <span>{sumTime}</span>
        /1000(h)
      </p>
    </div>
  );
};
