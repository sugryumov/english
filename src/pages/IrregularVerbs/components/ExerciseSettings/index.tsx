import { FC } from "react";
import { Button, Form, Select, Typography } from "antd";
import { useActions } from "../../../../hooks/useActions";
import { EXERCISE_STEPS } from "../../../../constants/exerciseSteps";

export const ExerciseSettings: FC = () => {
  const { setChangeStep, setIrregularVerbsSettings } = useActions();

  const onChangeCount = () => {};

  const onFinish = (values: any) => {
    setIrregularVerbsSettings(values);
    setChangeStep(EXERCISE_STEPS.EXERCISE);
  };

  return (
    <div className="exercise-settings">
      <Typography.Title level={2} className="exercise-settings__title">
        Irregular Verbs settings
      </Typography.Title>

      <Form
        name="exerciseSettings"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        className="exercise-settings__form"
      >
        <Form.Item
          name="count"
          label="Count verbs"
          rules={[{ required: true }]}
        >
          <Select
            allowClear
            onChange={onChangeCount}
            placeholder="Select a option and change input text above"
          >
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="20">20</Select.Option>
            <Select.Option value="50">50</Select.Option>
            <Select.Option value="all">All</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="form" label="Form verbs" rules={[{ required: true }]}>
          <Select
            allowClear
            onChange={onChangeCount}
            placeholder="Select a option and change input text above"
          >
            <Select.Option value="simplePast">Simple Past</Select.Option>
            <Select.Option value="pastParticiple">
              Past Participle
            </Select.Option>
            <Select.Option value="random">Random</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Start exercise
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
