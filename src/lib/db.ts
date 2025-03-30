
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from './mongodb';

// Utility to handle ObjectId conversion
const toObjectId = (id: string) => {
  try {
    return new ObjectId(id);
  } catch (error) {
    console.error('Invalid ObjectId:', id, error);
    throw new Error('Invalid ID format');
  }
};

// Database service for handling common operations
export const dbService = {
  // Get the database instance
  getDb: async (dbName = 'rentlink') => {
    const client = await clientPromise;
    return client.db(dbName);
  },

  // Tenants collection operations
  tenants: {
    getAll: async () => {
      const db = await dbService.getDb();
      return db.collection('tenants').find({}).toArray();
    },
    getById: async (id: string) => {
      const db = await dbService.getDb();
      return db.collection('tenants').findOne({ _id: toObjectId(id) });
    },
    create: async (tenant: any) => {
      const db = await dbService.getDb();
      return db.collection('tenants').insertOne(tenant);
    },
    update: async (id: string, data: any) => {
      const db = await dbService.getDb();
      return db.collection('tenants').updateOne(
        { _id: toObjectId(id) },
        { $set: data }
      );
    },
    delete: async (id: string) => {
      const db = await dbService.getDb();
      return db.collection('tenants').deleteOne({ _id: toObjectId(id) });
    }
  },

  // Properties collection operations
  properties: {
    getAll: async () => {
      const db = await dbService.getDb();
      return db.collection('properties').find({}).toArray();
    },
    getById: async (id: string) => {
      const db = await dbService.getDb();
      return db.collection('properties').findOne({ _id: toObjectId(id) });
    }
  },

  // Payments collection operations
  payments: {
    getAll: async () => {
      const db = await dbService.getDb();
      return db.collection('payments').find({}).sort({ date: -1 }).toArray();
    },
    getByTenant: async (tenantId: string) => {
      const db = await dbService.getDb();
      return db.collection('payments').find({ tenantId }).sort({ date: -1 }).toArray();
    },
    create: async (payment: any) => {
      const db = await dbService.getDb();
      return db.collection('payments').insertOne(payment);
    }
  },

  // Reminders collection operations
  reminders: {
    getUpcoming: async () => {
      const db = await dbService.getDb();
      return db.collection('reminders')
        .find({ scheduledDate: { $gte: new Date() } })
        .sort({ scheduledDate: 1 })
        .toArray();
    },
    create: async (reminder: any) => {
      const db = await dbService.getDb();
      return db.collection('reminders').insertOne(reminder);
    }
  }
};

export default dbService;
