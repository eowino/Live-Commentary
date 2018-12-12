import * as React from 'react';

export interface IKeyMoment {
  time: string;
  name: string;
  id: string;
  onClick: (e: any) => void;
}

export const KeyMoment: React.FunctionComponent<IKeyMoment> = ({
  time,
  name,
  id,
  onClick,
}) => (
  <div className="key-moment">
    <a
      className="key-moment__target"
      role="button"
      tabIndex={0}
      onClick={() => onClick(id)}>
      <span className="key-moment__time">{time}'</span>
      <span className="key-moment__name">{name}</span>
    </a>
  </div>
);

export const KeyMoments: React.FunctionComponent<{
  keyMoments: IKeyMoment[];
}> = ({ keyMoments }) => (
  <ul className="ul--no-default">
    {keyMoments.map((keyMoment, i) => (
      <li key={i}>
        <KeyMoment {...keyMoment} />
      </li>
    ))}
  </ul>
);
