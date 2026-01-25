import { Schema, model, Types } from 'mongoose';

const AuditLogSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: false, // register belum punya userId
    },
    action: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    resourceId: {
      type: Types.ObjectId,
      required: false,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const AuditLogModel = model('log', AuditLogSchema);
