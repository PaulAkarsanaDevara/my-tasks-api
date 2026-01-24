import mongoose from 'mongoose';

export const isTransactionSupported = () => {
  return process.env.MONGO_TRANSACTION === 'true';
};

export const withTransaction = async <T>(
  useTransaction: boolean,
  callback: (session?: mongoose.ClientSession) => Promise<T>,
): Promise<T> => {
  if (!useTransaction) {
    return callback();
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await callback(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
