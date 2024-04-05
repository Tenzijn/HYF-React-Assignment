import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from '@chakra-ui/react';

type AlertComponentProps = {
  onClose: () => void;
  alertContent: {
    title: string;
    description: string;
    status: string;
    color: string;
  };
};

export default function AlertComponent({
  onClose,
  alertContent,
}: AlertComponentProps) {
  setTimeout(() => {
    onClose();
  }, 5000);

  return (
    <Alert
      position={'absolute'}
      width={'fit-content'}
      right={0}
      border={'1px'}
      m={'1rem'}
      ml={'auto'}
      status={
        alertContent.status as
          | 'error'
          | 'success'
          | 'info'
          | 'warning'
          | 'loading'
          | undefined
      }
      color={alertContent.color}
      zIndex={'10000'}
    >
      <AlertIcon />
      <Box>
        <AlertTitle>{alertContent.title}</AlertTitle>
        <AlertDescription>{alertContent.description}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        ml={'auto'}
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
}
