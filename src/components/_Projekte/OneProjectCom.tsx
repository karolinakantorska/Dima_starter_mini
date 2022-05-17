//import { useState, ReactNode, useEffect } from 'react';
//import { m, useAnimation } from 'framer-motion';
// @mui
import { Container, Grid, Typography } from '@mui/material';
// _mock_
import Image from 'next/image';
import { ProjectType } from '../../utils/TS/interface';
import { firstLettersBig, writeObiektTypeInGerman, writeServiceInGerman } from '../../utils/Text/textUtils';
import { testDescription } from 'src/_mock/text';

export function OneProjectCom({ project }: { project: ProjectType }) {
  /*
    const { photo, photos, id, title, description, year, objektAlter, objektType, services, region, phase, client, architect, cooperation, location } = project;
    */

  return (
    <Container disableGutters={true}>
      {project &&
        <Grid
          container
          direction="column"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <Grid
              container
              justifyContent="center"
            >
              <Typography variant="h6" component="h2" paragraph color="dima">
                {firstLettersBig(project.title)} | {project.year} | {project.location}
                <Typography variant="caption" component="p" paragraph color="text.secondary">
                  {project.objektType.map((type, i) =>
                    `${writeObiektTypeInGerman(type)}${(i + 1 === project.objektType.length)
                      ? ', '
                      : ' und '}`)}
                  {project.objektAlter}, {project.size}&#13217;
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="span" paragraph color="text.primary">
              {`Unsere Leistungen: `}
            </Typography>
            {project.services.map((service, i) => <Typography key={service} variant="body1" component="span" paragraph color="text.primary">
              {writeServiceInGerman(service)}{(i + 1 === project.services.length) ? '' : ', '}
            </Typography>)}
          </Grid>
          {project.client && <Grid item>
            <Typography variant="body1" component="span" paragraph color="text.primary">
              Bauher: {project.client}
            </Typography>
          </Grid>}
          {project.architect && <Grid item>
            <Typography variant="body1" component="span" paragraph color="text.primary">
              Architektur: {project.architect}
            </Typography>
          </Grid>}
          {project.cooperation && <Grid item><Typography variant="body1" component="p" paragraph color="text.primary">
            {project.cooperation.service}: {project.cooperation.company}
          </Typography></Grid>}

          <Grid item>
            <Grid
              container
              justifyContent="center"
            >
              <Image
                src={project.photo.url}
                alt={project.photo.alt}
                width='1200px'
                height='674px'
              //layout='fill' 
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="p" paragraph color="text.secondary">
              {project.description}
            </Typography>
            <Typography color="text.secondary">
              {testDescription}
            </Typography>
          </Grid>
        </Grid>}
    </Container >
  );
}

