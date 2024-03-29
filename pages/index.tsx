import type { InferGetStaticPropsType, NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import mattchoo from "../public/static/mattchoo.jpg";
import mattchooContent from "../landing/LandingPageContent";
import Hoverable from "../components/Hoverable";
import DisplayText from "../components/DisplayText";
import Navbar from "../components/Navbar";

const LandingPage: NextPage = () => {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<undefined | number>(undefined);
  const [displayAll, setDisplayAll] = useState(false);
  const [animationReset, setAnimationReset] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);

  function resetSpin() {
    setAnimationReset(false);

    //console.log("toggling!");
    setTimeout(() => {
      setAnimationReset(true);
      //console.log("Toggling finished!");
    }, 10);
  }
  useEffect(() => {
    setHovered(undefined);
    setHasClicked(false);
  }, [selected]);
  const iconsLength = mattchooContent[selected].content.reduce(
    (num: number, curr) => {
      if (curr.hoverable) num++;
      return num;
    },
    0
  );
  //console.log("IconsLength is: " + iconsLength);
  const angleOffset = (Math.PI * 2) / iconsLength;
  let angle = 0;
  const width = 250;
  const height = 250;
  const radius = 175;
  const hovSize = 60;
  const icons: JSX.Element[] = mattchooContent[selected].content.reduce(
    (icons: JSX.Element[], section) => {
      //console.log("Section is: " + Object.entries(section));
      if (section.hoverable) {
        const sectDisplay = displayAll
          ? true
          : hovered === section.hoverableIndex;
        //do math shenanigans
        // const xOffset = 150 * Math.cos(angle);
        const xOffset = Math.round(
          width / 2 + radius * Math.cos(angle) - hovSize / 2
        );
        const yOffset = Math.round(
          height / 2 + radius * Math.sin(angle) - hovSize / 2
        );
        angle += angleOffset;
        icons.push(
          <div
            style={{
              position: "absolute",
              left: xOffset,
              top: yOffset,
            }}
            key={section.hoverable.name}
          >
            <Hoverable
              hoverable={section.hoverable}
              shouldDisplay={sectDisplay}
              index={section.hoverableIndex}
              setHovered={setHovered}
            />
          </div>
        );
      }
      return icons;
    },
    []
  );

  const sectionTitles = mattchooContent.map((sect) => sect.title);
  //console.log(sectionTitles);

  const isLinkClickable = mattchooContent[selected].clickableText;
  //console.log(mattchooContent[selected]);
  const displayText: JSX.Element[] = mattchooContent[selected].content.map(
    (section, index) =>
      section.plain ? (
        <DisplayText
          text={section.plain}
          key={index}
          fullLine={section.fullLine}
        />
      ) : (
        <DisplayText
          text={section.hoverable?.name}
          setHasClicked={setHasClicked}
          hasClicked={hasClicked}
          index={section.hoverableIndex}
          link={section.hoverable?.link}
          displayLink={isLinkClickable}
          currSelected={hovered === section.hoverableIndex}
          setHovered={setHovered}
          key={index}
        />
      )
  );

  return (
    <div>
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="All about Matthew Nieva. Perfect for your stalking needs. Check out how to contact me, past positions I've held and projects I've worked on, some of my hobbies, and more!"
        />
        <meta
          property="og:image"
          content="https://www.matthewnieva.com/static/image-desc.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content="Matthew Nieva" />
        <meta
          property="og:description"
          content="All about Matthew Nieva. Perfect for your stalking needs. Check out how to contact me, past positions I've held and projects I've worked on, some of my hobbies, and more!"
        />

        <link rel="apple-touch-icon" href="./apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon-16x16.png"
        />
        <link rel="manifest" href="./manifest.json" />
        <title>Matthew Nieva</title>
      </Head>

      <main>
        <div className="app">
          <Navbar
            resetSpin={resetSpin}
            sections={sectionTitles}
            selected={selected}
            setSelected={setSelected}
            setHovered={setHovered}
          />
          <div className="landing-body">
            <h2 id="name">{mattchooContent[selected].header}</h2>
            <div id="center-grid">
              <div
                className={`hoverables-display ${
                  animationReset ? "rotate-display " : ""
                } ${hovered !== undefined ? "paused" : ""}`}
              >
                {animationReset && (
                  <div className="hoverables-holder">{icons}</div>
                )}
              </div>
              {/* Is it constant picture? */}
              {mattchooContent[selected].constantPic ? (
                <div className="circular center-pic">
                  <Image
                    src={mattchooContent[selected].constantPic}
                    className="circular center-pic"
                    alt="matthew-nieva"
                    priority={true}
                  />{" "}
                </div>
              ) : // Is it hovered or not?
              hovered || hovered === 0 ? (
                //is the icon a picture or SVG?
                <div className="circular center-pic">
                  <Image
                    src={
                      mattchooContent[selected].hoverables[hovered].hoverable
                        ?.icon
                    }
                    className="circular center-pic"
                    alt="project-pic"
                    priority={true}
                  />
                </div>
              ) : (
                <div className="circular center-pic">
                  <Image
                    src={mattchoo}
                    className="circular center-pic"
                    alt="matthew-nieva"
                    priority={true}
                  />
                </div>
              )}
            </div>

            <div className="spaced-row">
              <label className="text-section">
                Display All
                <input
                  type="checkbox"
                  value="DisplayLinks"
                  checked={displayAll}
                  onChange={() => setDisplayAll((prevVal) => !prevVal)}
                />
              </label>
            </div>
            <div className="text-section extra-text">{displayText}</div>
            <div className="text-section extra-text">
              {(hovered && hovered < iconsLength) || hovered === 0
                ? mattchooContent[selected].hoverables[hovered].hoverable
                    ?.extraText
                : mattchooContent[selected].defaultText}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
