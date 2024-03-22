import {
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

function TextInput() {
  return (
    <Box mt={'8px'} maxW={'400px'} w={'100%}'}>
      <InputGroup size='lg'>
        <Input
          pr='4.5rem'
          placeholder='Type here ...'
          bg='#f1f1f1'
          color='black'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' bg='gray' color='white'>
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export { TextInput };
