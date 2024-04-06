import { useState } from 'react';
import { Box, Progress } from '@chakra-ui/react';

function Booting() {
  const [progress, setProgress] = useState(0);

  setTimeout(() => {
    setProgress((oldProgress) => {
      return oldProgress + 0.5;
    });
  }, 1000);

  return (
    <Box>
      <Progress hasStripe value={progress} />
    </Box>
  );
}

export { Booting };
