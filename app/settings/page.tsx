"use client";

import { BrandsTable } from "@/components/BrandsTable";
import { AddNewBrand } from "@/components/forms/AddNewBrand";
import { AddNewCar } from "@/components/forms/AddNewCar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS, Step, EVENTS } from 'react-joyride';

// Function to dynamically create steps based on data attributes
const createSteps = (): Step[] => [
  {
    target: '[data-tour="step-1"]',
    content: 'This is my first step!',
    placement: 'bottom',
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  },
  {
    target: '[data-tour="step-2"]',
    content: 'This is my other step!',
    placement: 'top',
    styles: {
      options: {
        backgroundColor: '#e3ffeb',
        textColor: '#004a14',
      },
    },
  },
  {
    target: '[data-tour="step-3"]',
    content: (
      <>
        <div>abc</div>

        <p>sadasdas</p>

        <h5>'This is my other step!'</h5>
      </>
    ),
    placement: 'top',
    styles: {
      options: {
        backgroundColor: '#e3ffeb',
        textColor: '#004a14',
      },
    },
  },
];

export default function Settings() {
  const { data } = useSession();

  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    if (data?.token) {
      setRun(true);
      setStepIndex(0);  // Ensure the tour starts from the first step
      setSteps(createSteps());
    }
  }, [data?.token]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data;
    const finishedStatuses: string[] = ['finished', 'skipped'];

    console.log('Joyride callback type:', type); // Debugging log
    // console.log('Joyride callback data:', data); // Debugging log
    console.log('Joyride callback data:', action); // Debugging log

    if (finishedStatuses.includes(status)) {
      setRun(false);
      setStepIndex(0);
    } else if (type === EVENTS.STEP_AFTER && action === 'next') {
      setStepIndex((prevIndex) => prevIndex + 1);
    } else if (type === EVENTS.STEP_AFTER && action === 'prev') {
      setStepIndex((prevIndex) => {
        console.log(Math.max(prevIndex - 1, 0), 'Math.max(prevIndex - 1, 0)')
        return Math.max(prevIndex - 1, 0)
      });
    } else if (type === EVENTS.TARGET_NOT_FOUND) {
      setStepIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (!data?.token) {
    return <div>Unauthorized</div>;
  }

  const startTour = () => {
    setRun(true);
    setStepIndex(0);
    setSteps(createSteps());
  };

  return (
    <main className="flex justify-start min-h-screen flex-col items-center p-24">
      <div>
        <button onClick={startTour}>Start Tour</button>
        <Joyride
          steps={steps}
          run={run}
          stepIndex={stepIndex}
          continuous
          showProgress
          showSkipButton
          callback={handleJoyrideCallback}
          scrollToFirstStep
          scrollToSteps
          disableOverlayClose
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
        <div data-tour="step-1">First Step</div>
        <div data-tour="step-2">Other Step</div>
      </div>
      <AddNewCar />
      <br />
      <AddNewBrand />
      <BrandsTable />
    </main>
  );
}
