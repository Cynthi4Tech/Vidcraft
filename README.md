# Vidcraft - AI Video Generator

An AI-powered text-to-video generation platform designed to help content creators generate quality videos effortlessly.

## Features

- **Text-to-Video Generation**: Convert text descriptions into engaging videos
- **Multiple Voice Options**: Choose from various AI voices for narration
- **Auto Scene Generation**: AI-generated visuals and scenes
- **30-Second Videos**: Optimized for social media (YouTube, TikTok, Instagram)
- **Preset Templates**: Start with ready-made video templates
- **Video Management**: View, edit, and download generated videos

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Framework**: Python FastAPI
- **Database**: PostgreSQL
- **Task Queue**: Celery (for async video processing)
- **Video Processing**: FFmpeg
- **AI APIs**: OpenAI (for text processing), RunwayML/D-ID (for video generation)
- **Deployment**: Railway / AWS EC2

### Database
- **Primary**: PostgreSQL
- **Schema**: Videos, Users, Templates, Processing Jobs

## Project Structure

```
vidcraft/
├── frontend/              # Next.js frontend application
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
├── backend/              # Python FastAPI backend
│   ├── app/
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   ├── services/
│   └── requirements.txt
├── database/             # Database schemas and migrations
│   └── migrations/
├── docs/                 # Documentation
│   ├── API.md
│   ├── SETUP.md
│   └── ARCHITECTURE.md
└── .github/
    └── workflows/        # CI/CD workflows
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- FFmpeg installed

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend runs on `http://localhost:8000`

### Database Setup
```bash
# Create PostgreSQL database
createdb vidcraft

# Run migrations
cd database
psql vidcraft < migrations/001_initial_schema.sql
```

## API Endpoints

### Video Generation
- `POST /api/videos/generate` - Generate video from text
- `GET /api/videos/{id}` - Get video details
- `GET /api/videos` - List user videos
- `DELETE /api/videos/{id}` - Delete video

### Templates
- `GET /api/templates` - List available templates
- `GET /api/templates/{id}` - Get template details

### User
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/user/profile` - Get user profile

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Vidcraft
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/vidcraft
SECRET_KEY=your_secret_key_here
OPENAI_API_KEY=your_openai_key
RUNWAYML_API_KEY=your_runwayml_key
JWT_ALGORITHM=HS256
JWT_EXPIRE_HOURS=24
```

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## Deployment

- **Frontend**: Deploy to Vercel (automatic from GitHub)
- **Backend**: Deploy to Railway or AWS EC2
- **Database**: Use managed PostgreSQL (AWS RDS, Railway, Heroku)

## Roadmap

### Phase 1 (MVP)
- [ ] Basic text-to-video generation
- [ ] 3-5 preset templates
- [ ] Single voice option
- [ ] User authentication
- [ ] Video download

### Phase 2
- [ ] Multiple voice options
- [ ] Custom video length
- [ ] Video editing interface
- [ ] Batch video generation

### Phase 3
- [ ] Multi-language support
- [ ] Advanced templates
- [ ] Video analytics
- [ ] Subscription tiers

## Contributing

Contributions are welcome! Please follow the existing code style and add tests for new features.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue or contact support.

---

Built with ❤️ for content creators