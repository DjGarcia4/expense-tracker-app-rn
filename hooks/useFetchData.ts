import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { snapshot } from "node:test";

const useFetchData = <T>(
  collectionName: string,
  constrains: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collection) return;
    const collectionRef = collection(firestore, collectionName);
    const q = query(collectionRef, ...constrains);

    const unSub = onSnapshot(
      q,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => {
          return {
            id: doc.data,
            ...doc.data(),
          };
        }) as T[];
        setData(fetchedData);
        setLoading(false);
      },
      (err) => {
        console.log("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unSub();
  }, []);
  return { data, loading, error };
};

export default useFetchData;

const styles = StyleSheet.create({});
