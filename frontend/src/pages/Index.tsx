import styled from 'styled-components';
import { Input, Card, Button, List, notification } from 'antd';
import { useState } from 'react';
import { parseSQLApi, getListApi, rebuildApi, deleteApi } from '../api/query';
import { useMutation, useQuery } from 'react-query';
import { modifiedQueryType } from '../types/sqlQuery';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Search } = Input;

const Container = styled.div`
  width: 800px;
`;

const DataCard = styled(Card)`
  margin-top: 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
`;

const Index = () => {
  const [sqlQuery, setSqlQuery] = useState<string>('');

  const { data, refetch } = useQuery('ListAPI', getListApi);

  const { mutate: parseMutate, isLoading } = useMutation(parseSQLApi, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      notification.open({
        message: 'Error',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    },
  });

  const { mutate: rebuildMutate } = useMutation(rebuildApi, {
    onSuccess: res => {
      setSqlQuery(res.sqlString);
    },
    onError: () => {
      notification.open({
        message: 'Error',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    },
  });

  const { mutate: deleteMutate } = useMutation(deleteApi, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      notification.open({
        message: 'Error',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    },
  });

  return (
    <Container>
      <h2>{`Please enter SQL query!`}</h2>
      <Search
        placeholder="Enter SQL Query..."
        enterButton="Parse"
        size="large"
        value={sqlQuery}
        onChange={e => {
          setSqlQuery(e.target.value);
        }}
        onSearch={() => {
          parseMutate(sqlQuery);
        }}
        loading={isLoading}
      />
      {Array.isArray(data?.data) &&
        data?.data.map((data: modifiedQueryType) => {
          return (
            <DataCard
              hoverable={true}
              key={data._id}
              onClick={() => {
                rebuildMutate({ modifiedSQL: data.modifiedSQL, map: data.map });
              }}
            >
              <List
                header={<div>{data.modifiedSQL}</div>}
                dataSource={Object.entries(data.map)}
                renderItem={item => (
                  <List.Item>{`${item[0]} : ${item[1]}`}</List.Item>
                )}
              />
              <ButtonArea>
                <Button
                  type="primary"
                  danger
                  onClick={e => {
                    e.stopPropagation();
                    deleteMutate(data._id);
                  }}
                >
                  Delete
                </Button>
              </ButtonArea>
            </DataCard>
          );
        })}
    </Container>
  );
};

export default Index;
