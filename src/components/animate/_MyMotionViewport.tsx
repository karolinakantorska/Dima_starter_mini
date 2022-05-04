import { m, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
//
import { varContainer } from '.';

// ----------------------------------------------------------------------

type IProps = BoxProps & MotionProps;

interface Props extends IProps {
  children: ReactNode;
  disableAnimatedMobile?: boolean;
}

export default function _MyMotionViewport({
  children,
  disableAnimatedMobile = false,
  ...other
}: Props) {
  return (
    <Box
      component={m.div}
      initial="initial"
      exit="exit"
      animate="animate"
      //whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
