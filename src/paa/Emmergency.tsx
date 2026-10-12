import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";

interface EmmergencyProps {
  closeModal: (value: boolean) => void;
}

type EmergencyType =
  | "faint"
  | "nose-bleed"
  | "heart-attack"
  | "epileptic"
  | "poisoning"
  | "overbleeding"
  | "wound-dressing"
  | "allergic-reactions"
  | "hypoglycemia"
  | "loose-catheter-fixing"
  | "falls";

interface EmergencyButton {
  type: EmergencyType;
  name: string;
}

const Emmergency: React.FC<EmmergencyProps> = ({ closeModal }) => {
  const [precaution, setPrecaution] = useState<string>("");
  const [activeCard, setActiveCard] = useState<string>("");
  const [selectedEmergency, setSelectedEmergency] = useState<string>("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const staggeredItems = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const cardContentStaggeredItems = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const handleSelection = (type: EmergencyType, name: string) => {
    let precautionText = "";
    let newActiveCard = activeCard === type ? "" : type;

    switch (type) {
      case "faint":
        precautionText = `
          1. Lay the person down flat on their back.
          2. Elevate their legs to improve blood flow to the brain.
          3. Loosen tight clothing.
          4. If the person does not regain consciousness within a minute, call emergency services.
          5. If faint occur frequently do the normal procedure that the doctor adviced or ask a family member who knows the procedure well.
          6. (For the caregivers); Follow the terms and conditions of employment contract or ask for guidance if this procedure is not stated, else call for emergency assistance.
          7. Ensure the safety of the patient comes first.
        `;
        break;
      case "nose-bleed":
        precautionText = `
          1. Sit the person down and lean them slightly forward.
          2. Pinch the soft part of the nose and hold for 10 minutes.
          3. Apply ice to the back of the neck to constrict blood vessels.
          4. If bleeding continues after 20 minutes, seek medical assistance.
        `;
        break;
      case "heart-attack":
        precautionText = `
          1. Call emergency services immediately.
          2. If the person is conscious, have them chew an aspirin (unless allergic).
          3. Loosen any tight clothing and have the person rest.
          4. Perform CPR if the person becomes unconscious and stops breathing.
          5. If heart-attack occur frequently do the normal procedure that the doctor adviced or ask a family member who knows the procedure well.
          6. (For the caregivers); Follow the terms and conditions of employment contract or ask for guidance if this procedure is not stated, else call for emergency assistance.
          7. Ensure the safety of the patient comes first.
        `;
        break;
      case "epileptic":
        precautionText = `
          1. Stay calm and ensure the person is safe.
          2. Clear the area around them to avoid injury.
          3. Do not restrain their movements or place anything in their mouth.
          4. After the seizure, place them in the recovery position and stay with them until they are fully alert.
          5. If epilepsy occur frequently do the normal procedure that the doctor adviced or ask a family member who knows the procedure well.
          6. (For the caregivers); Follow the terms and conditions of employment contract or ask for guidance if this procedure is not stated, else call for emergency assistance.
          7. Ensure the safety of the patient comes first.
        `;
        break;
      case "poisoning":
        precautionText = `
          1. Call emergency services immediately.
          2. Try to identify the poison and report it to medical professionals.
          3. Do not induce vomiting unless directed by a healthcare professional.
          4. If the person is unconscious but breathing, place them in the recovery position.
        `;
        break;
      case "overbleeding":
        precautionText = `
          1. Apply direct pressure to the wound using a clean cloth or bandage.
          2. Elevate the injured area above the heart, if possible.
          3. Do not remove any embedded objects; stabilize them instead.
          4. Call emergency services if bleeding does not stop after 10 minutes.
        `;
        break;
      case "wound-dressing":
        precautionText = `
          1. Clean the wound with clean water and antiseptic, if available.
          2. Cover the wound with a sterile dressing or bandage.
          3. Change the dressing regularly to keep it clean.
          4. Seek medical attention for severe wounds or signs of infection.
        `;
        break;
      case "allergic-reactions":
        precautionText = `
          1. Remove the allergen if possible (e.g., stop eating the food, move away from the trigger).
          2. Use an epinephrine auto-injector (EpiPen) if the person has one and knows how to use it.
          3. Call emergency services immediately if breathing difficulties occur.
          4. Stay with the person until medical help arrives.
        `;
        break;
      case "hypoglycemia":
        precautionText = `
          1. Give the person a fast-acting sugar source, such as fruit juice, candy, or glucose tablets.
          2. Check their blood sugar level if they have a glucose meter.
          3. If symptoms persist, encourage them to eat a more substantial snack like bread or crackers.
          4. Call emergency services if the person becomes unconscious.
        `;
        break;
      case "loose-catheter-fixing":
        precautionText = `
          1. Avoid pulling on the catheter or causing any further dislodgement.
          2. Use medical tape to temporarily secure the catheter in place.
          3. Contact a healthcare professional for proper catheter repositioning.
          4. Monitor for signs of infection or improper functioning.
        `;
        break;
      case "falls":
        precautionText = `
          1. Help the person to stay still and assess for injuries.
          2. If they are in pain or cannot move, call for medical help.
          3. Apply ice to any bumps or bruises and elevate the injured area.
          4. Avoid moving / lifting the patient if there are signs of head, neck, or back injuries.
          5. If falls occur frequently do the normal procedure that the doctor adviced or ask a family member who knows the procedure well.
          6. (For the caregivers); Follow the terms and conditions of employment contract or ask for guidance if this procedure is not stated, else call for emergency assistance.
          7. Ensure the safety of the patient comes first
        `;
        break;
      default:
        precautionText =
          "Stay safe, follow emergency protocols, and contact authorities for assistance.";
    }

    setPrecaution(precautionText);
    setSelectedEmergency(name);
    setActiveCard(newActiveCard);
  };

  const closeCard = () => {
    setActiveCard("");
    setPrecaution("");
    setSelectedEmergency("");
  };

  const buttons: EmergencyButton[] = [
    { type: "faint", name: "Faint" },
    { type: "nose-bleed", name: "Nose Bleed" },
    { type: "heart-attack", name: "Heart Attack" },
    { type: "epileptic", name: "Epileptic" },
    { type: "poisoning", name: "Poisoning" },
    { type: "overbleeding", name: "Overbleeding" },
    { type: "wound-dressing", name: "Wound Dressing" },
    { type: "allergic-reactions", name: "Allergic Reactions" },
    { type: "hypoglycemia", name: "Hypoglycemia" },
    { type: "loose-catheter-fixing", name: "Loose Catheter Fixing" },
    { type: "falls", name: "Falls" },
  ];

  return (
    <div>
      <div className="paa-modal-background">
        <div className="paa-modal-container">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="paa-modal-title fw-light text-warning-emphasis mt-4">
              <h2 className="fs-3">Select Emergency</h2>
            </div>
            <div
              className="title-close-btn"
              style={{ backgroundColor: "transparent" }}
            >
              <button
                onClick={() => closeModal(false)}
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#664d03"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="paa-modal-body my-4 text-center">
            {!activeCard && (
              <motion.div initial="hidden" animate="visible" className="w-100">
                {buttons.map((button, i) => (
                  <motion.div
                    key={button.type}
                    custom={i}
                    variants={staggeredItems}
                    className="w-100"
                  >
                    <Button
                      variant=""
                      className="mb-2 pop-w mx-auto"
                      onClick={() => handleSelection(button.type, button.name)}
                      style={{
                        backgroundColor: "#f1f1f1",
                        borderRadius: "12px",
                        color: "#664d03",
                      }}
                    >
                      {button.name}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeCard && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariant}
              >
                <Card
                  className="shadow"
                  style={{
                    zIndex: 2,
                    position: "relative",
                    height: "100%",
                    borderRadius: "30px",
                  }}
                >
                  <motion.div
                    variants={cardContentStaggeredItems}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card.Body
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <motion.div
                        custom={0}
                        variants={cardContentStaggeredItems}
                      >
                        <Card.Title className="text-warning-emphasis">
                          Precaution for {selectedEmergency}
                        </Card.Title>
                      </motion.div>
                      <motion.div
                        custom={1}
                        variants={cardContentStaggeredItems}
                      >
                        <Card.Text
                          className="text-start"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {precaution}
                        </Card.Text>
                      </motion.div>
                      <motion.div
                        custom={2}
                        variants={cardContentStaggeredItems}
                      >
                        <Button
                          variant=""
                          className="mt-3 pop-w mx-auto"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "#664d03",
                            color: "white",
                          }}
                          onClick={closeCard}
                        >
                          Close
                        </Button>
                      </motion.div>
                    </Card.Body>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emmergency;
