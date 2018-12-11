import * as React from 'react';

export interface IKeyMoment {
  time: string;
  name: string;
  id: string;
}

export const KeyMoment: React.FunctionComponent<IKeyMoment> = ({
  time,
  name,
  id,
}) => (
  <div className="key-moment">
    <a
      className="key-moment__target"
      role="button"
      tabIndex={0}
      data-target-id={id}>
      <span className="key-moment__time">{time}</span>
      <span className="key-moment__name">{name}</span>
    </a>
  </div>
);

export const KeyMoments: React.FunctionComponent<{
  keyMoments: IKeyMoment[];
}> = ({ keyMoments }) => (
  <section>
    <h2>Key Moments</h2>
    <ul className="ul--no-default">
      {keyMoments.map((keyMoment, i) => (
        <li key={i}>
          <KeyMoment
            time={keyMoment.time}
            name={keyMoment.name}
            id={keyMoment.id}
          />
        </li>
      ))}
    </ul>
  </section>
);
