import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Payment from "~/components/Booking/Payment";
import SelectSeat from "~/components/Booking/SelectSeat";
import SelectSnack from "~/components/Booking/SelectSnack";
import Stepper from "~/components/UI/Stepper";

const steps = ["Chọn ghế", "Chọn bắp nước", "Thanh toán"];

const Booking: NextPage = () => {
  const [step, setStep] = useState<number>(0);

  const handleNextStep = () => {
    if (step < 2) setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    if (step > 0) setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Head>
        <title>Đặt vé</title>
      </Head>
      <div className="bg-white dark:bg-dark-bg-primary">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <Stepper
            steps={steps}
            currentStep={step}
            onChangeStep={(newStep) => {
              setStep(newStep);
            }}
          />
          {step === 0 && <SelectSeat handleNextStep={handleNextStep} />}
          {step === 1 && (
            <SelectSnack
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            />
          )}
          {step === 2 && <Payment handleBack={handlePrevStep} />}
        </div>
      </div>
    </>
  );
};

export default Booking;
