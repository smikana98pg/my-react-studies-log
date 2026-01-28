/**
 * @jest-environment jsdom
*/
// モックを最初に定義（全てのimportより前）
jest.mock('../../utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
      insert: jest.fn().mockResolvedValue({ data: null, error: null }),
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      }),
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      }),
    })),
  },
}))

jest.mock('../../utils/supabaseFunction', () => ({
  getAllStudies: jest.fn(async () => ({ data: [], error: null })),
  addStudies: jest.fn(async () => ({ data: null, error: null })),
  deleteStudies: jest.fn(async () => ({ data: null, error: null })),
}))

import {App} from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen,fireEvent, waitFor } from "@testing-library/react";
import { getAllStudies } from "../../utils/supabaseFunction";

test("render 学習記録一覧 after loading", async () => {
  render(<App />);

  // Loading が最初に出る
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // 非同期描画を待つ
  const title = await screen.findByText("学習記録一覧");
  expect(title).toBeInTheDocument();
});

test("登録すると学習記録が1つ増える", async () => {
  render(<App />);

  // ここ超重要
  await screen.findByText("学習記録一覧");

  // 入力
  fireEvent.change(screen.getByPlaceholderText("学習内容"), {
    target: { value: "Jest" },
  });
  fireEvent.change(screen.getByPlaceholderText("学習時間"), {
    target: { value: "3" },
  });

  // 登録
  fireEvent.click(screen.getByRole("button", { name: "登録" }));

  // 追加後
  const itemsAfter = await screen.findAllByTestId("study-item");
  expect(itemsAfter).toHaveLength(1);
});

test("削除ボタンを押すと学習記録が1つ減る", async () => {
  getAllStudies.mockResolvedValueOnce({
    data: [{ id: "1", title: "Jest", time: 3 }],
    error: null,
  });

  render(<App />);

  await screen.findByText("学習記録一覧");

  expect(screen.getAllByTestId("study-item")).toHaveLength(1);

  fireEvent.click(screen.getByRole("button", { name: "削除" }));

  await waitFor(() => {
    expect(screen.queryByTestId("study-item")).toBeNull();
  });
});

test("未入力で登録するとエラーが表示される", async () => {
  render(<App />);

  await screen.findByText("学習記録一覧");

  fireEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(
    screen.getByText("入力されていない項目があります")
  ).toBeInTheDocument();
});


