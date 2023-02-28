import { useContext } from 'react'
import {
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Typography,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { UIContext } from '@/context/ui'
import Link from 'next/link'

export const Navbar: React.FC = () => {
  const { openSidebar } = useContext(UIContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openSidebar}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Link
            href="/"
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Typography variant="h6">OpenJira</Typography>
          </Link>
          <Button
            color="inherit"
            disabled
            sx={{
              marginLeft: 'auto',
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
