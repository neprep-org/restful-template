import React from "react";
import { Tooltip } from "react-tooltip";

type Prop = {
  text: string;
  length: number;
};

const TruncatedText = ({ text, length = 100 }: Prop) => {
  const truncated =
    text.length > length ? text.substring(0, length) + "..." : text;
  return (
    <div className="mb-4 text-white ">
      <span data-tip={text} data-for="tooltip">
        {truncated}
      </span>
      <Tooltip id="tooltip" place="top" />
    </div>
  );
};

export default TruncatedText;
