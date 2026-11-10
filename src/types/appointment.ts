export type CallStage =
  | 'Planning Before Pregnancy'
  | 'Currently Pregnant'
  | 'Preparing for Birth'
  | 'Already Delivered'
  | 'Baby Already Born'
  | 'Others';

export type CallPreferredTime = 'Morning' | 'Afternoon' | 'Evening' | 'Flexible';

export type CallAppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface FifteenMinuteCallAppointment {
  id: string;
  fullName: string;
  whatsapp: string;
  email: string;
  country: string;
  preferredDate: string;
  preferredTime: CallPreferredTime;
  stage: CallStage;
  notes?: string;
  durationMinutes: 15;
  status: CallAppointmentStatus;
  createdAt: string;
}
