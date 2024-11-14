'use server';

import { ApikeyStatus } from '@/enums/apikey.enum';
import { Schedule, initialState as initialScheduleState } from '@/interfaces/schedule.interface';
import { SlackConfig, initialState as initialSlackState } from '@/interfaces/slack.interface';
import { State } from '@/interfaces/state.interface';
import { getClient } from '@/utils/api';

export const getScheduleAction = async (): Promise<Schedule> => {
  const client = await getClient();

  try {
    const { data } = await client.get('/api/v1/schedules');
    return data;
  } catch {
    return initialScheduleState;
  }
};

export const postScheduleAction = async (schedule: Schedule): Promise<Schedule> => {
  const client = await getClient();

  try {
    const { data } = await client.post('/api/v1/schedules', schedule);
    return data;
  } catch {
    return initialScheduleState;
  }
};

export const getSlackConfigAction = async (): Promise<SlackConfig> => {
  const client = await getClient();

  try {
    const { data } = await client.get('/api/v1/slack/config');
    return data;
  } catch {
    return initialSlackState;
  }
};

export const postConfigAction = async (url: string, formData: FormData): Promise<State> => {
  const client = await getClient();

  try {
    await client.post(url, formData);

    return {
      success: true,
      message: '업데이트했습니다.',
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const postUpbitConfigAction = async (_: State, formData: FormData): Promise<State> => {
  return postConfigAction('/api/v1/upbit/config', formData);
};

export const postSlackConfigAction = async (_: State, formData: FormData): Promise<State> => {
  return postConfigAction('/api/v1/slack/config', formData);
};

export const getStatusAction = async (url: string): Promise<ApikeyStatus> => {
  const client = await getClient();

  try {
    const { data } = await client.get(url);
    return data;
  } catch {
    return ApikeyStatus.UNKNOWN;
  }
};

export const getUpbitStatusAction = async (): Promise<ApikeyStatus> => {
  return getStatusAction('/api/v1/upbit/status');
};

export const getSlackStatusAction = async (): Promise<ApikeyStatus> => {
  return getStatusAction('/api/v1/slack/status');
};
