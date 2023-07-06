import React, { useState, useEffect } from "react";
import { Grid, useTheme, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import RealizationItem from "../../RealizationItem";
import type { Realizations } from "@/utils/schema/realization";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

//Define Types
type Props = {
  realizations: Realizations;
};

const DesktopView = ({ realizations }: Props): JSX.Element => {
  const [slides, setSlides] = useState<Array<JSX.Element>>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  const carouselSlides = () => {
    const qt = isMobile ? 2 : 3;
    const sliderItems: number = realizations.length > qt ? qt : realizations.length;
    const items: Array<JSX.Element> = [];

    for (let i = 0; i < realizations.length; i += sliderItems) {
      if (i % sliderItems === 0) {
        items.push(
          <Grid container spacing={2} key={i.toString()} sx={{ pl: 1, pr: 1 }}>
            {realizations.slice(i, i + sliderItems).map((realization, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index.toString()}>
                  <RealizationItem realization={realization} />
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }
    setSlides(items);
  };

  useEffect(() => {
    carouselSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <Carousel
      autoPlay={false}
      cycleNavigation={false}
      animation="slide"
      sx={{ width: "100%", height: 360, pt: 3 }}
      IndicatorIcon={<HorizontalRuleIcon />}
      indicatorContainerProps={{
        style: {
          zIndex: 1,
          position: "absolute",
          top: "-18px",
          paddingRight: "10px",
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        },
      }}
    >
      {slides}
    </Carousel>
  );
};

export default DesktopView;
