import React from "react";
import { docsData } from "../libs/data";
import drillpilot from "../../public/drillpilot.svg";
import Image from "next/image";
import { ScrollArea } from "@mantine/core";
import menuDesign from "../../public/menu_design.png";
import NewDesign from "../../public/new_design_menu.png";
import VaribleGuide from "../../public/VariableGuide.png";
import ClientComponent from "./ClientComponent";

export const metadata = {
  title: "Drill Pilot Documentation - Variable Guide",
  description:
    "Welcome to the Drill Pilot Documentation! Here you will find a guide to variables and sample calculations for your survey designs.",
  keywords: "Drill Pilot, Documentation, Variable Guide, Survey Designs",
};

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b-2 border-gray-300 py-4 bg-white shadow-sm">
        <div className="container mx-auto flex justify-center">
          <Image src={drillpilot} width={200} height={200} alt="sunsab logo" />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <ScrollArea style={{ height: "calc(100vh - 160px)" }}>
          <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Drill Pilot Variable Guide and Sample Calculations
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Welcome to the Drill Pilot Documentation!
              </p>
              <p className="text-lg text-gray-600 mb-4">
                When you first open the Drill Pilot application, an empty
                interface will greet you.
              </p>
              <div className="mb-4">
                <Image
                  src={menuDesign}
                  width={800}
                  height={400}
                  alt="Drill Pilot Interface"
                />
              </div>
              <p className="text-lg text-gray-600 mb-4">
                The next step for opening up your very own survey begins by
                clicking new design.
              </p>
              <div className="mb-4">
                <Image
                  src={VaribleGuide}
                  width={250}
                  height={400}
                  alt="New Design Interface"
                />
              </div>
              <p className="text-lg text-gray-600 mb-4">
                Once New Design is clicked, a variable guide will open to the
                users. These variables can change every portion of the survey,
                from which direction it bends to the depth of the vertical. All
                aspects of the survey are controlled through these variables.
              </p>
              <Image
                src={NewDesign}
                width={800}
                height={400}
                alt="Drill Pilot Interface"
              />
            </div>
            <ClientComponent docsData={docsData} />
          </div>
        </ScrollArea>
      </main>
      <footer className="bg-white border-t-2 border-gray-300 py-4">
        <div className="container mx-auto text-center text-gray-600">
          Copyright © 2024 Sunsab & DrillPilot. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Page;
