export const Input = (props) => {
  const { title, time, onTitleChange, onTimeChange } = props;
  return (
    <>
      <p>
        学習内容
        <input type="text" onChange={onTitleChange} value={title} />
      </p>
      <p>
        学習時間
        <input type="number" onChange={onTimeChange} value={time} />
      </p>
      <p>
        入力されている学習内容：<span>{title}</span>
      </p>
      <p>
        入力されている学習時間：<span>{time}時間</span>
      </p>
    </>
  );
};
