import AcUnitIcon from '@mui/icons-material/AcUnit'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PaletteIcon from '@mui/icons-material/Palette'
import ExtensionIcon from '@mui/icons-material/Extension'
import GroupIcon from '@mui/icons-material/Group'

const items = [
  {
    title: 'WebXR Visualization',
    text:
      'Explore complex data as a 3D network right in your browser. Walk around it, zoom in, and view connections from any angle.',
    icon: <AcUnitIcon />,
  },
  {
    title: 'AI-Powered Insight Engine',
    text:
      'Ask natural-language questions and let AI highlight the answers inside your graph.',
    icon: <SmartToyIcon />,
  },
  {
    title: 'Custom Graph Design',
    text:
      'Personalize your scene with layouts, colors, and shapes that match your data or brand identity.',
    icon: <PaletteIcon />,
  },
  {
    title: 'Semantic Data Support',
    text:
      'Seamlessly parse RDF, JSON-LD, or CSV structures — we detect entities, properties, and links automatically.',
    icon: <ExtensionIcon />,
  },
  {
    title: 'Collaboration & Sharing',
    text:
      'Invite teammates to explore, comment, and share immersive views securely via link or QR code.',
    icon: <GroupIcon />,
  },
]

export default items
