import { Box, Stack, Typography, Paper, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { addCollection } from '../../redux/states/cmState'
import CollectionCard from './../CM/CollectionCard'

type Props = {}

const CManageInfo = (props: Props) => {
  const dispatch = useAppDispatch()

  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )

  const handleAddCollection = (event: any) => {
    dispatch(addCollection({ collection: 'New' }))
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
          <Button
            variant='outlined'
            sx={{ height: 'fit-content', mr: 5 }}
            onClick={handleAddCollection}
          >
            + New Entry
          </Button>
        </Stack>

        <Typography sx={{ fontSize: 20, ml: 0 }}>
          {currentCollection?.data?.length} entries found
        </Typography>
      </Box>

      <Paper
        elevation={2}
        component='div'
        sx={{ width: '90%', mt: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <CollectionCard
          id='id'
          name={currentCollection?.contentType?.[0]?.name || ''}
          createdAt='Created At'
          disabled
          gridSx={{
            pl: '16px',
            pr: '16px',
            pt: 0,
            pb: 0,
            borderBottom: '2px solid rgba(0,0,0,.1)',
          }}
        />
        <Stack direction='column' justifyContent={'center'} spacing={0}>
          {currentCollection?.data?.map((value: any, index: number) => (
            <CollectionCard
              key={index}
              id={index}
              name={value?.[currentCollection?.contentType?.[0]?.name] || ''}
              createdAt='May 12, 1800'
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
              url={`/content-management/${value?.id}`}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  )
}

export default CManageInfo
