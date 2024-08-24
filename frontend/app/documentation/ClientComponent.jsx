"use client";

import React from "react";
import { Accordion } from "@mantine/core";
import Image from "next/image";

const ClientComponent = ({ docsData }) => {
  return (
    <Accordion chevronPosition="left" variant="separated" radius="md">
      {docsData.map((doc, index) => (
        <Accordion.Item key={index} value={doc.title}>
          <Accordion.Control>{doc.title}</Accordion.Control>
          <Accordion.Panel>
            <p className="text-gray-600 mb-4 whitespace-pre-line">
              {doc.description}
            </p>
            {doc.imageUrl && (
              <Image
                width={500}
                height={100}
                src={doc.imageUrl}
                alt={doc.title}
                className="rounded-md flex"
              />
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ClientComponent;
