import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/projectlens';

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, default: 'ACTIVE' },
  isTeamFocus: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'IN_PROGRESS'], default: 'PENDING' },
  projectId: mongoose.Schema.Types.ObjectId,
  completedAt: Date
});

const Project = mongoose.model('Project', ProjectSchema);
const Task = mongoose.model('Task', TaskSchema);

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    const projects = [
      { 
        name: 'ProjectLens Core API', 
        description: 'Main GraphQL and REST infrastructure for the ProjectLens ecosystem. Sprint 04 in progress.',
        status: 'ACTIVE',
        isTeamFocus: true
      },
      { 
        name: 'Mobile App Redesign', 
        description: 'Transitioning to React Native with a focus on gesture-driven navigation and offline-first data sync.',
        status: 'ACTIVE',
        isTeamFocus: false
      },
      { 
        name: 'Legacy Auth Provider', 
        description: 'Maintenance of the old OAuth2 system. Preparing for deprecation in Q3.',
        status: 'ARCHIVED',
        isTeamFocus: false
      }
    ];

    for (const p of projects) {
      const project = await Project.create(p);
      console.log(`Created project: ${project.name}`);

      const tasks = Array.from({ length: 8 }).map((_, i) => ({
        name: `${['Research', 'Design', 'Development', 'Review', 'Testing', 'Handoff', 'Marketing', 'Launch'][i]} for ${project.name}`,
        status: i < 3 ? 'COMPLETED' : (i < 5 ? 'IN_PROGRESS' : 'PENDING'),
        projectId: project._id,
        completedAt: i < 3 ? new Date() : null
      }));

      await Task.insertMany(tasks);
      console.log(`Added 8 tasks to ${project.name}`);
    }

    console.log('\nSeeding complete! 🚀');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
