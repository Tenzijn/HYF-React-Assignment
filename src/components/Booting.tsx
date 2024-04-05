import { Box, Progress } from '@chakra-ui/react';
function Booting() {
  return (
    <Box>
      <Progress hasStripe value={64} />
    </Box>
  );
}

export { Booting };
