import React, { Component } from "react";
import Layout from "../../components/layouts/Layout";
import Updates from "../../components/games/Updates";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export async function getServerSideProps(context) {
  const { gid } = context.query;
  let detail = "";
  const docRef = doc(db, "updates", gid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    detail = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    //console.log("No such document!");
  }

  return {
    props: {
      detail,
    },
  };
}

export default function Detail({ detail }) {
  return (
    <Layout title="Game updates">
      <Updates detail={detail} />
    </Layout>
  );
}
