import Head from "next/head";
import DetailList from "../../components/list/DetailList";
import Content from "../../components/list/Content";
import Layout from "../../components/layouts/Layout";
export default function List() {
  return (
    <div>
      <Layout title="Game List">
        <Content></Content>
        <DetailList></DetailList>
      </Layout>
    </div>
  );
}
