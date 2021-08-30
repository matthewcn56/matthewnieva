import React from "react";
import "../landing/landingPage.css";
interface DisplayProps {
  text: string | undefined;
  index?: number;
  setHovered?: React.Dispatch<React.SetStateAction<number | undefined>>;
  currSelected?: boolean;
  link?: any;
  displayLink?: boolean;
}

export default function DisplayText(props: DisplayProps) {
  return props.index !== undefined ? (
    <div>
      <a
        href={props.displayLink ? props.link : undefined}
        rel="noreferrer noopener"
        target="_blank"
        style={{ cursor: "pointer" }}
      >
        <div
          className={`text-container ${props.currSelected ? "active" : ""}`}
          onMouseEnter={() => {
            if (props.setHovered) props.setHovered(props.index);
          }}
          onMouseLeave={() => {
            if (props.setHovered && props.displayLink)
              props.setHovered(undefined);
          }}
          onTouchStart={() => {
            if (props.setHovered) props.setHovered(props.index);
          }}
          onTouchEnd={() => {
            if (props.setHovered && props.displayLink)
              props.setHovered(undefined);
          }}
          onTouchCancel={() => {
            if (props.setHovered && props.displayLink)
              props.setHovered(undefined);
          }}
        >
          {props.text}
          <div className="text-section-line" />
        </div>
      </a>
    </div>
  ) : (
    <div className="text-container">{props.text}</div>
  );
}
