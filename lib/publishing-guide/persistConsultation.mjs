import { attemptConsultationNotification } from '../mail/sendConsultationNotification.mjs'

export async function persistConsultation({ record, notification }, dependencies) {
  const insert = dependencies.insert
  const notify = dependencies.notify || attemptConsultationNotification
  const { error } = await insert(record)
  if (error) return { saved: false, error }

  const notificationResult = await notify(notification)
  return { saved: true, notification: notificationResult }
}

