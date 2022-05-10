// @mui
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { ProjectType } from '../../utils/TS/interface';
import useResponsive from '../../hooks/useResponsive';
import { firstLettersBig } from '../../utils/Text/textUtils';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

export function TextCardCom({ project, big, rewerseBig, authorPhoto }: {
  project: ProjectType, big: boolean, rewerseBig: boolean
  , authorPhoto: string
}) {
  const { title, location } = project;
  const isDesktop = useResponsive('up', 'lm');
  const cardProps = {
    p: isDesktop ? 4 : 1.2,
  }
  const cardPropsBig = {
    gridColumn: rewerseBig ? '1 / span 2' : '4 / span 2',
    gridRow: 'span 2',
    backgroundColor: 'background.default'
  }
  const PhotoAuthorTypography = styled(Typography)(({ theme }) => ({
    position: 'relative',
    right: isDesktop ? '30px' : '0px',
    top: isDesktop ? '-30px' : '-5px'
  }));
  const TextBox = () => (
    <Box sx={big ? { backgroundColor: 'background.paper', p: 4, minHeight: '300px' } : {}}>
      {authorPhoto && <PhotoAuthorTypography variant="caption" display="p">
        {authorPhoto} </PhotoAuthorTypography>}
      <Typography variant="h6" component="h2" sx={{
        mt: 2, mb: 0.5,
      }}>
        {firstLettersBig(title)}
      </Typography>
      <Typography variant="overline" component="h6" sx={{ mb: 2, color: 'text.secondary', }}>
        {location}
      </Typography>
    </Box>
  )

  return (!isDesktop ?
    <Card sx={{ ...cardProps }}  >
      <TextBox />
    </Card>
    :
    <>
      {!big &&
        <Card sx={{ ...cardProps }}  >
          <TextBox />
        </Card>
      }
      {big &&
        <Card sx={big ? { ...cardPropsBig } : { ...cardProps }} >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: rewerseBig ? '1fr 12px' : '12px 1fr',
            }}
          >
            {big && <Box sx={{
              backgroundColor: 'background.default',
              gridRow: 'span 2',
              gridColumn: rewerseBig ? '2' : '1',
            }}>
            </Box>}
            <TextBox />
          </Box>
        </Card>
      }
    </>

  );
}
