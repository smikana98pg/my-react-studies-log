import { useState } from "react";
import { Input } from "./Input";

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [isInput, setIsInput] = useState(true);
  const [records, setRecords] = useState([]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTimeChange = (e) => {
    setTime(e.target.value);
  };

  const onButtonClick = () => {
    if (title === "" || time <= 0) {
      setIsInput(false);
      return;
    }
    setIsInput(true);

    const newRecord = {
      id: Date.now(),
      title: title,
      time: Number(time),
    };

    const newRecords = [...records, newRecord];
    setRecords(newRecords);

    setTitle("");
    setTime(0);
  };

const sumTime = records.reduce(
  (sum, record) => sum + record.time,
  0
);

  return (
    <div>
      <Input
        title={title}
        time={time}
        onTitleChange={onTitleChange}
        onTimeChange={onTimeChange}
      />

      {records.map((record) => (
        <p key={record.id}>
          {record.title} {record.time}時間
        </p>
      ))}

      <button onClick={onButtonClick}>登録</button>
      {!isInput && <p>入力されていない項目があります</p>}
      <p>
        合計時間：
        <span>{sumTime}</span>
        /1000(h)
      </p>
    </div>
  );
};
