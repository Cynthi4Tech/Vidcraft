# Vidcraft Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.10+ ([Download](https://www.python.org/))
- PostgreSQL 14+ ([Download](https://www.postgresql.org/))
- Git ([Download](https://git-scm.com/))
- FFmpeg ([Download](https://ffmpeg.org/download.html))

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Cynthi4Tech/vidcraft.git
cd vidcraft
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
touch .env.local
```

Add to `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Vidcraft
```

Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
touch .env
```

Add to `backend/.env`:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/vidcraft
SECRET_KEY=your-super-secret-key-change-this
JWT_ALGORITHM=HS256
JWT_EXPIRE_HOURS=24
OPENAI_API_KEY=your_openai_key
RUNWAYML_API_KEY=your_runwayml_key
REDIS_URL=redis://localhost:6379
DEBUG=False
```

### 4. Database Setup

```bash
# Create database
createdb vidcraft

# Run migrations
cd database
psql vidcraft < migrations/001_initial_schema.sql

# Verify tables
psql vidcraft -c "\\dt"
```

### 5. Start Backend Server

From the `backend` directory with virtual environment activated:
```bash
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

## Verification

### Test Backend API

```bash
# Health check
curl http://localhost:8000/health

# API documentation
open http://localhost:8000/docs
```

### Test Frontend

Visit `http://localhost:3000` in your browser

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Troubleshooting

### Database Connection Error
```
Error: could not connect to server: Connection refused
```
Solution: Ensure PostgreSQL is running:
```bash
# macOS
brew services start postgresql

# Linux
sudo service postgresql start

# Windows
pg_ctl -D "C:\\Program Files\\PostgreSQL\\14\\data" start
```

### Port Already in Use
If port 3000 or 8000 is already in use:

```bash
# Frontend: Change port
npm run dev -- -p 3001

# Backend: Change port
uvicorn app.main:app --reload --port 8001
```

### Python Dependencies Error
```bash
# Clear cache and reinstall
pip install --no-cache-dir -r requirements.txt
```

## Next Steps

1. Read the [API Documentation](API.md)
2. Review the [Architecture](ARCHITECTURE.md)
3. Check the [Roadmap](../README.md#roadmap)
4. Start developing!

## Getting Help

- GitHub Issues: https://github.com/Cynthi4Tech/vidcraft/issues
- Documentation: Check the `/docs` folder
- API Docs: Run backend and visit `/docs`