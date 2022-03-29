import React, { useState } from "react";
import { Link } from "react-router-dom";

const Winners: React.FC = () => {
  type TSubject =
    | `Physics`
    | `Biology`
    | `Chemistry`
    | `Math`
    | `Computer Science`;

  const [subject, setSubject] = useState<TSubject>(`Physics`);

  return (
    <div className={`h-auto w-full px-10 py-10`}>
      <h1
        className={`text-center tracking-wide text-2xl text-primaryBlue mt-4 font-semibold`}
      >
        <i className={`fa fa-trophy mr-2 text-yellow-700`}></i>
        2022 SMT Fair - Interactive Games Winners
      </h1>
      <ul
        className={`w-full flex justify-center mt-6 flex-col gap-2 xl:flex-row lg:flex-row md:flex-row xl:gap-5 lg:gap-5 md:gap-5`}
      >
        <li
          onClick={() => setSubject(`Physics`)}
          className={`cursor-pointer underline text-normalBlue duration-150 hover:text-primaryBlue hover:font-semibold text-14px`}
        >
          Physics
        </li>
        <li
          onClick={() => setSubject(`Biology`)}
          className={`cursor-pointer underline text-normalBlue duration-150 hover:text-primaryBlue hover:font-semibold text-14px`}
        >
          Biology
        </li>
        <li
          onClick={() => setSubject(`Chemistry`)}
          className={`cursor-pointer underline text-normalBlue duration-150 hover:text-primaryBlue hover:font-semibold text-14px`}
        >
          Chemistry
        </li>
        <li
          onClick={() => setSubject(`Math`)}
          className={`cursor-pointer underline text-normalBlue duration-150 hover:text-primaryBlue hover:font-semibold text-14px`}
        >
          Math
        </li>
        <li
          onClick={() => setSubject(`Computer Science`)}
          className={`cursor-pointer underline text-normalBlue duration-150 hover:text-primaryBlue hover:font-semibold text-14px`}
        >
          Computer Science
        </li>
      </ul>
      <div>
        <Link
          to={`/portal`}
          className={`block text-center w-full mt-10 bg-normalBlue py-1 outline-none text-13px rounded-full duration-150 hover:bg-primaryBlue text-gray-50`}
        >
          <button className={``}>
            <i className={`fa fa-external-link`} /> Back to Portal
          </button>
        </Link>
        <div
          className={`physics mt-10 pb-10 bg-gray-700 text-gray-100 pt-10 overflow-y-auto h-winner w-auto pr-4 border border-gray-400 pl-5 md:pl-20 lg:pl-20 xl:pl-20`}
        >
          {subject === `Physics` && (
            <>
              <h1 className={`font-semibold  tracking-wider uppercase`}>
                {physicWinners.subject}
              </h1>
              {physicWinners.data.map((props) => {
                return (
                  <div className={`pb-5`}>
                    <h3
                      className={`text-rose-400 tracking-wider font-semibold mt-3`}
                    >
                      {props.yearLvl}
                    </h3>
                    <span className={`tracking-wide font-semibold`}>
                      Game Title: {props.title}
                    </span>
                    <ul className={`mt-4`}>
                      {props.students.map((student) => {
                        return <li className={`tracking-wider`}>{student}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
          {subject === `Biology` && (
            <>
              <h1 className={`font-semibold  tracking-wider uppercase`}>
                {biologyWinners.subject}
              </h1>
              {biologyWinners.data.map((props) => {
                return (
                  <div className={`pb-5`}>
                    <h3
                      className={`text-rose-400 tracking-wider font-semibold mt-3`}
                    >
                      {props.yearLvl}
                    </h3>
                    <span className={`tracking-wide font-semibold`}>
                      Game Title: {props.title}
                    </span>
                    <ul className={`mt-4`}>
                      {props.students.map((student) => {
                        return <li className={`tracking-wider`}>{student}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
          {subject === `Computer Science` && (
            <>
              <h1 className={`font-semibold  tracking-wider uppercase`}>
                {CSWinner.subject}
              </h1>
              {CSWinner.data.map((props) => {
                return (
                  <div className={`pb-5`}>
                    <h3
                      className={`text-rose-400 tracking-wider font-semibold mt-3`}
                    >
                      {props.yearLvl}
                    </h3>
                    <span className={`tracking-wide font-semibold`}>
                      Game Title: {props.title}
                    </span>
                    <ul className={`mt-4`}>
                      {props.students.map((student) => {
                        return <li className={`tracking-wider`}>{student}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
          {subject === `Chemistry` && (
            <>
              <h1 className={`font-semibold  tracking-wider uppercase`}>
                {ChemistryWinner.subject}
              </h1>
              {ChemistryWinner.data.map((props) => {
                return (
                  <div className={`pb-5`}>
                    <h3
                      className={`text-rose-400 tracking-wider font-semibold mt-3`}
                    >
                      {props.yearLvl}
                    </h3>
                    <span className={`tracking-wide font-semibold`}>
                      Game Title: {props.title}
                    </span>
                    <ul className={`mt-4`}>
                      {props.students.map((student) => {
                        return <li className={`tracking-wider`}>{student}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
          {subject === `Math` && (
            <>
              <h1 className={`font-semibold  tracking-wider uppercase`}>
                {MathWinner.subject}
              </h1>
              {MathWinner.data.map((props) => {
                return (
                  <div className={`pb-5`}>
                    <h3
                      className={`text-rose-400 tracking-wider font-semibold mt-3`}
                    >
                      {props.yearLvl}
                    </h3>
                    <span className={`tracking-wide font-semibold`}>
                      Game Title: {props.title}
                    </span>
                    <ul className={`mt-4`}>
                      {props.students.map((student) => {
                        return <li className={`tracking-wider`}>{student}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Winners;

const physicWinners = {
  subject: `A. PHYSICS`,
  data: [
    {
      yearLvl: `Grade 7`,
      title: `7-Emerald`,
      students: [
        `Philip  Acidre`,
        `Juliana Villanueva`,
        `Charlene Irlandez`,
        `Adwinsur Gempeson`,
        `Kobe Duan`,
        `Josh Toscano`,
      ],
    },
    {
      yearLvl: `Grade 8`,
      title: `Planet Lyra Puzzle`,
      students: [
        `1st - [ Princess Nada, Joshan Sicadsicad ]`,
        `2.5th / Tie - [ Lizzy Agner, Kyle Llose, Zaryn Badillo ]`,
        `2.5th / Tie - [ Shenna Mae Ongbit, Nicole Angelique Naldo ]`,
        `4th - [ Rica Sophia C. Calipes, Rolfgin U. Basallage ]`,
      ],
    },
    {
      yearLvl: `Grade 9`,
      title: `Magnon Particle Puzzle`,
      students: [
        `1st Placer - Faye Rhianna Avendano`,
        `2nd Placer - Ellyce Lim, Mary Phipps`,
        `3rd Placer - Elizar John Zabala N.A.`,
        `4th Placer - Quizol and Francisco`,
        `5th Placer - Nikki Ela Tabaranza`,
        `6th Placer - Francis Zabala`,
      ],
    },
  ],
};

const biologyWinners = {
  subject: `B. biology`,
  data: [
    {
      yearLvl: `Grade 7`,
      title: `Using the Scientific Method to Survive an Escape Room`,
      students: [
        `1st Placer - [ Alyssa Capoquian, Rhazmazandra, Obaob ]`,
        `2nd Placer - [ Isha Young, Lilia Anne Ripalda, Christine Joy Mutthan ]`,
        `3rd Placer - [ Mary Julin Lopez, Jassielle Lopega ]`,
        `4th Placer - [ Samuelle Jagonio, Lyka Lagera, Samantha Villamejor, Amare Sudario ]`,
      ],
    },
    {
      yearLvl: `Grade 8`,
      title: `Mystery in the National Aquarium`,
      students: [
        `1st Placer - [ Hoo Lakambini, Narrido Natalie ]`,
        `2nd Placer - [ Samson Althea, Cesista Hannah ]`,
        `3rd Placer - [ Canales Fiona, Eloy Kimberly, Gullemas Iris ]`,
        `Special Prize - [ Faraon Zac, Agosila Fel ]`,
      ],
    },
    {
      yearLvl: `Grade 9`,
      title: `Mapping the Organ Systems`,
      students: [
        `1st Placer - [ Lelina, Advincula, Agnila P. , Agnila Z. , De Leon, Tabinas ]`,
        `2nd Placer - [ Abobo, Lao, Nase, Morabe, Saño ]`,
        `3rd Placer - [ Maud Mejias, Cordeta, Mendoza, Labine, Quebec ]`,
        `Special Prize (OrgaNames) - [ Fiona Nadine, Macalalag, Kiara Kayleigh-Ann, Gaut, Mark Hans Tarrayo, Nikki Ela Tabaranza, Mark Joshua Sudario ]`,
      ],
    },
  ],
};

const CSWinner = {
  subject: `E. Computer Scince`,
  data: [
    {
      yearLvl: `Grade 8`,
      title: `CodeRelay`,
      students: [
        `1st Placer (Sampaguita) - [ Khalil Bagas, Akhou Uribe, Enrico Pentado, Janbob Alota, Jaden Morales ]`,
        `2nd Placer (Camia) - [ Zachary Tan, Rhian Darantinao, Nina Marmita ]`,
        `3rd Placer (Jasmine) - [ Chad Cervantes, Alan Canono, Jim Cadion, Mark Valdez ]`,
      ],
    },
    {
      yearLvl: `Grade 9`,
      title: `CodeCombat`,
      students: [
        `Top 3 - [ Mark Hans TARRAYO - Tote bag, Mark Joshua SUDARIO -  bucket hat, Kelsey Marie GOMEZ - Tote bag ]`,
        `Consolation Prizes - {
          Ronhitz Cabungcag,
          John JOSOL,
          Sebastian Ong,
          Kyle Ravinn Nase,
          Fiona Nadine MACALALAG,
          Benj Josh Justine SALVATIERRA,
          Clarence Tabina,
          Nikki Ela Tabaranza,
          Ellizar John ZABALA
        }`,
      ],
    },
  ],
};

const ChemistryWinner = {
  subject: `C. Chemistry`,
  data: [
    {
      yearLvl: `Grade 7`,
      title: ``,
      students: [``],
    },
    {
      yearLvl: `Grade 8`,
      title: ``,
      students: [``],
    },
    {
      yearLvl: `Grade 9`,
      title: ``,
      students: [``],
    },
  ],
};

const MathWinner = {
  subject: `D. Math`,
  data: [
    {
      yearLvl: `Grade 7`,
      title: `Guess the Mathematician`,
      students: [
        `Winners : [ 
        Samuelle Jagonio,
        Samantha Lian,
        Chad Tristan,
        Jef Allen Oliver,
        Francis Pla,
        Chris Jon Penaflor,
        Ruthzil Modesto,
        Eyessa Jintalan,
        Keefe Terence Matobato,
        Nino Christian Arado,
        Melody Joy Quintana,
        Samantha Corona,
        Aliyah Agang,
        Rei Christopher Alinsub,
        Giovanni Ignacio,
        Precious Fara Berdos,
        Philip Arthur Acidre,
        Keith Emmanuel Separa,
        Jaliyah Ayesha Tecson,
        Kassandra Nicole Garces
        Joshua Rey Mendoza 
      ]`,
      ],
    },
    {
      yearLvl: `Grade 8`,
      title: `Guess the Mathematician`,
      students: [
        `Winners : [ 
        Jedric Chu,
        Charles David Tan Uy,
        Mylka Machica,
        Samantha Macabit,
        Nina Mae Marmita,
        Ariadni Palomo,
        Kytlin Trinity Reas,
        Kyle Benedict Ciervo,
        Francheska Gudgad,
        Enrico Pentado,
        Chimzil Montalban,
        Rhainbert Lampayan,
        Akhou Uribe,
        Richard Gerilla,
        David Edward Roberts,
        Rhian Darantinao,
        Joshan Sicadsicad 
      ]`,
      ],
    },
    {
      yearLvl: `Grade 9`,
      title: `Guess the Mathematician`,
      students: [
        `Winners: [ 
        Nikki Ela Tabaranza,
        Kiara Gaut,
        Zenas Praise Agnila,
        Poimen Agnila,
        Mark Joshua Sudario,
        Clarence Tabinas,
        Bea Avila,
        Shine Yu,
        Ellyce Jae Lim,
        Raniel Hermosilla,
        Jezrel Sano,
        Faye Rhianna,
        Gaea Jazlin Tonido,
        John Josol,
        Kyle Ravinn Nase,
        Rizh Keilah Manago 
      ]`,
      ],
    },
  ],
};
