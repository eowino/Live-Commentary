import * as React from 'react';

export type Commentary = {
  id: string;
  time: string;
  body: string;
};

export interface ICommentaryItem {
  children: React.ReactNode;
  time: string;
}

export interface ICommentaries {
  commentaries: Commentary[];
}

export const CommentaryItem = ({ children, time }: ICommentaryItem) => (
  <div className="commentary__card">
    <div className="commentary__time">{time}</div>
    <div className="commentary__body">{children}</div>
  </div>
);

export const Commentaries = ({ commentaries }: ICommentaries) => (
  <ul className="commentary ul--no-default">
    {commentaries.map((commentary, i) => (
      <li key={commentary.id || i}>
        <CommentaryItem time={commentary.time}>
          {commentary.body}
        </CommentaryItem>
      </li>
    ))}
  </ul>
);
