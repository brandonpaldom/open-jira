import { Card, CardHeader, Grid } from '@mui/material'
import { Layout } from '@/components/layouts'
import { EntryList, NewEntry } from '@/components/ui'

export const HomePage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="TO DO" />
            <NewEntry />
            <EntryList status="to-do" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="IN PROGRESS" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="DONE" />
            <EntryList status="done" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
