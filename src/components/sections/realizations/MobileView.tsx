import React, { useState } from "react";
import { Button, Container, Stack } from "@mui/material";
import RealizationItem from "../../RealizationItem";
import type { Realizations } from "@/utils/schema/realization";

//Define Types
type Props = {
  realizations: Realizations;
};

const MobileView = ({ realizations }: Props): JSX.Element => {
  const initSlides = 3;
  const [howMany, setHowMany] = useState(initSlides);

  return (
    <Stack spacing={2}>
      {realizations.slice(0, howMany).map((realization, index) => (
        <RealizationItem realization={realization} key={index} />
      ))}

      <Button
        variant="text"
        color="inherit"
        onClick={() => setHowMany(howMany >= realizations.length ? initSlides : howMany + 2)}
      >
        {howMany >= realizations.length ? "Zwiń" : "Pokaż więcej"}
      </Button>
    </Stack>
  );
};

export default MobileView;
