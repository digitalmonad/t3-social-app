"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../Button";
import { useSession } from "next-auth/react";
import { ProfileImage } from "../ProfileImage";

const updateTextAreaHeight = (textArea: HTMLTextAreaElement) => {
  if (!textArea) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
};

export type TNewPostForm = {
  onSubmit: ({ content }: { content: string }) => Promise<void>;
};

export const NewPostForm = ({ onSubmit }: TNewPostForm) => {
  const session = useSession();
  const [text, setText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaHeight(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    if (!textAreaRef.current) return;
    updateTextAreaHeight(textAreaRef.current);
  }, [text]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    void (async () => {
      await onSubmit({ content: text });
      setText("");
    })();
  };

  if (session.status !== "authenticated") return;
  return (
    <div>
      <form
        className="flex flex-col gap-2 border-b px-4 py-2"
        onSubmit={handleFormSubmit}
      >
        <div className="flex gap-4">
          <ProfileImage src={session.data.user.image} />
          <textarea
            ref={inputRef}
            style={{ height: 0 }}
            value={text}
            onChange={handleTextChange}
            className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
            placeholder="What is happening?"
          />
        </div>
        <Button>Tweet</Button>
      </form>
    </div>
  );
};
