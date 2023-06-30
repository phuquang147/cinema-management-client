import { IconCheck } from "@tabler/icons";

type StepperProps = {
  steps: string[];
  currentStep: number;
  onChangeStep: (newStep: number) => void;
};

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onChangeStep,
}) => {
  const stateClasses = (index: number, currentStep: number) => {
    if (index < currentStep) return "bg-green-400 border-green-400 text-white";

    if (index === currentStep) return "border-primary text-primary";

    return "text-gray-200";
  };

  return (
    <div className="w-full flex justify-between relative py-4">
      <div className="absolute w-full h-[2px] bg-gradient-to-r from-light-pink to-light-red top-[34px] z-0"></div>
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex flex-col items-center z-10 cursor-pointer"
          onClick={() => {
            onChangeStep(index);
          }}
        >
          <div
            className={`bg-dark-bg-primary border-2 rounded-full h-10 w-10 flex justify-center items-center font-bold ${stateClasses(
              index,
              currentStep
            )}`}
          >
            {index < currentStep ? <IconCheck /> : index + 1}
          </div>
          <p className="text-base font-medium mt-2 text-gray-100">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
