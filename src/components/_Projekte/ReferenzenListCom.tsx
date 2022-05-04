import { useState, ReactNode, useEffect } from 'react';
import { m, } from 'framer-motion';
// @mui
import { Box, Container, Grid, } from '@mui/material';

// hooks
import useResponsive from '../../hooks/useResponsive';
import { useRouter } from 'next/router';
// components
import { ProjektCardCom } from './ProjektCardCom';

// _mock_
import { _mockProjekts } from '../../_mock/referenzen/referenzen';
// utils
import { useForm } from 'src/utils/myUtils/useForm';
import { filter } from 'src/utils/myUtils/filterFunction';
import { FilterReferenzenCom } from './FilterReferenzenCom';

// TODO use location instead use route
export function ReferenzenListCom() {
  const initialInputs = { param: "Alle" }
  const [sorted, setSorted] = useState(false);
  const [xPosition, setXPosition] = useState(200);
  const [yPosition, setYPosition] = useState(728);
  const isDesktop = useResponsive('up', 'lm');
  const isSmallDesktop = useResponsive('up', 'lg');
  const isSmall = useResponsive('down', 'sm');
  const gtc = isDesktop ? 'repeat(3, 1fr)' : isSmall ? '1fr' : 'repeat(2, 1fr)';
  const { query } = useRouter();
  const { inputs, handleInputChange, } = useForm({ param: "Alle" });
  const filteredProjects = filter(_mockProjekts, inputs);
  const animatedPaths = () => filteredProjects.slice(0, 4).map((entry) => `/referenz/${entry.id}`)
  const isAnimated = animatedPaths().includes(`/referenz/${query.id}`);
  //const filteredProjects = _mockProjekts;
  // console.log('inputs', inputs)
  useEffect(() => {
    const position = () => {
      if ((window.innerWidth - 1700) > 0) {
        return (window.innerWidth - 1700) * 0.5 + 50
      }
      else return 50
    }
    setXPosition(position())
    setYPosition(728 - ((1700 - window.innerWidth) * 0.37))
  })
  useEffect(() => {
    if (inputs.param !== initialInputs.param) {
      setSorted(true);
    }
  }, [inputs])
  const variantUp = {

    initial: isSmallDesktop
      ? { height: '4px', width: 0, y: 728, x: 0 }
      : { height: '4px', width: 0, yPosition, x: 0 },
    animate: isSmallDesktop
      ? { x: -xPosition, transition: { duration: .1 } }
      : { y: yPosition, x: -xPosition, transition: { duration: .1 } },
    exit: isAnimated && { width: ['0.1vw', '101.5vw', '101.5vw'], scaleY: [1, 1, 400] },
    transition: { duration: 1 },

  };
  return (
    <>
      <Box
        component={m.div}
        {...variantUp}
        sx={{ backgroundColor: 'dima', position: 'absolute', zIndex: 1200 }}>
      </Box>
      <Container disableGutters={true}>
        <Grid container direction="column" justifyContent="center" spacing={2} sx={{
          mt: 0
        }}>


          <Grid item>
            <FilterReferenzenCom
              sorted={sorted}
              inputs={inputs}
              handleInputChange={handleInputChange}
            />
            <Box
              display="grid"
              gridTemplateColumns={gtc}
              //justifyItems='stretch'
              //gridAutoFlow="dense"
              columnGap="12px"
              rowGap="20px"
            >
              {filteredProjects.map((project, i) => {
                const divideIn2 = i % 2 == 0 ? true : false;
                const divideIn4 = (i + 1) % 4 == 0 ? true : false;
                const divideIn8 = (i + 1) % 8 == 0 ? true : false;
                return (

                  <ProjektCardCom
                    key={project.id}
                    project={project}
                    gridRow={divideIn2 ? '1' : '2'}
                    big={divideIn4 ? true : false}
                    //big={false}
                    rewerseBig={divideIn8 ? true : false}
                  />

                );
              })}
            </Box>
          </Grid>
        </Grid >
      </Container >
    </>
  );
}
