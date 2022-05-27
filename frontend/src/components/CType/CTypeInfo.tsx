import { Box, Stack, Typography, Paper, Button } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import CTypeDialog from './CTypeDialog'

import TypeCard from './TypeCard'

type Props = {}

const CTypeInfo = (props: Props) => {
  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()
  const currentProject = useAppSelector((state) => state.cm.currentProject)

  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )

  const handleAddNewType = () => {}

  const handleAddType = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box component='div' sx={{ pl: 4, pt: 2, width: '75%' }}>
      <Box component='div'>
        <Stack
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
            {currentCollection?.name}
          </Typography>
          {currentProject !== 'channel-tech' && (
            <Button
              variant='outlined'
              sx={{ height: 'fit-content', mr: 5 }}
              onClick={handleAddType}
            >
              + New Type
            </Button>
          )}
        </Stack>

        <Typography sx={{ fontSize: 20, ml: 0 }}>
          {currentCollection?.contentType?.length} types found
        </Typography>
      </Box>
      <CTypeDialog open={open} handleClose={handleClose} />

      <Paper
        elevation={2}
        component='div'
        sx={{ width: '90%', mt: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <TypeCard
          name='Name'
          type='Type'
          gridSx={{
            pl: '16px',
            pr: '16px',
            pt: 1,
            pb: 1,
            borderBottom: '2px solid rgba(0,0,0,.1)',
          }}
        />
        <Stack direction='column' justifyContent={'center'} spacing={1}>
          {currentCollection?.contentType?.map((value, index) => (
            <TypeCard
              key={index}
              name={value?.name}
              type={value?.type}
              gridSx={{
                pl: '16px',
                pr: '16px',
                pt: 1,
                pb: 1,
                ':hover': {
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                },
              }}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  )
}

export default CTypeInfo
