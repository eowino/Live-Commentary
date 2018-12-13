import * as React from 'react';

export interface ICommentary {
  id: string;
  time: string;
  body: string;
  highlight?: string;
}

export interface ICommentaryItem {
  children: React.ReactNode;
  time: string;
}

export const CommentaryItem: React.FunctionComponent<ICommentaryItem> = ({
  children,
  time,
}) => (
  <div className="commentary__card">
    <div className="commentary__time">{time}'</div>
    <div className="commentary__body">{children}</div>
  </div>
);

export const Commentaries: React.FunctionComponent<{
  commentaries: ICommentary[];
  onAnimationEnd?: (e: any) => void;
}> = ({ commentaries, onAnimationEnd }) => (
  <section>
    <h1>Live commentary</h1>
    <ul className="commentary ul--no-default">
      {commentaries.map((commentary, i) => (
        <li
          key={commentary.id || i}
          data-target-id={commentary.id}
          onAnimationEnd={onAnimationEnd}>
          <CommentaryItem time={commentary.time}>
            {commentary.body}
          </CommentaryItem>
        </li>
      ))}
    </ul>
  </section>
);
