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
        name: 'Cloud Migration Prep', 
        description: 'Historical audit of infrastructure in preparation for the multi-cloud migration strategy.',
        status: 'ARCHIVED',
        isTeamFocus: false
      },
      { 
        name: 'Legacy UI Cleanup', 
        description: 'Deprecation and cleanup of the jQuery-based dashboard components.',
        status: 'ARCHIVED',
        isTeamFocus: false
      },
      { 
        name: 'Security Audit 2026', 
        description: 'Quarterly pen-testing and vulnerability assessment of the core authentication gateway.',
        status: 'ACTIVE',
        isTeamFocus: true
      }
    ];

    for (const p of projects) {
      const project = await Project.create(p);
      console.log(`Created project: ${project.name}`);

      // Special case: Legacy UI Cleanup (Archived, no tasks)
      if (p.name === 'Legacy UI Cleanup') {
        console.log(`Skipped tasks for ${project.name}`);
        continue;
      }

      // Special case: Cloud Migration Prep (Archived, low progress)
      const isLowProgress = p.name === 'Cloud Migration Prep';
      const taskCount = isLowProgress ? 12 : 8;
      
      const tasks = Array.from({ length: taskCount }).map((_, i) => {
        let status = 'PENDING';
        let completedAt: Date | null = null;

        if (isLowProgress) {
          // Only 1 completed task out of 12
          if (i === 0) {
            status = 'COMPLETED';
            completedAt = new Date();
          } else if (i < 3) {
            status = 'IN_PROGRESS';
          }
        } else {
          // Standard mix
          if (i < 3) {
            status = 'COMPLETED';
            completedAt = new Date();
          } else if (i < 5) {
            status = 'IN_PROGRESS';
          }
        }

        return {
          name: `${['Research', 'Design', 'Architecture', 'Coding', 'Integration', 'Review', 'Testing', 'QA', 'Staging', 'Security', 'Doc', 'Launch'][i % 12]} for ${project.name}`,
          status,
          projectId: project._id,
          completedAt
        };
      });

      await Task.insertMany(tasks);
      console.log(`Added ${tasks.length} tasks to ${project.name}`);
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
