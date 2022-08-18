function wasTwoPassed(...args) {
  if (args.includes(2)) {
    return true;
  } else {
    return false;
  }
}

wasTwoPassed(3, 5, 2, 5);
wasTwoPassed(3, 5, 10, 5);
wasTwoPassed();
wasTwoPassed(2);
wasTwoPassed([2, 2, 2]);
