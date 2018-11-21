package com.debidadefensa.service.util;

import org.apache.commons.lang3.RandomStringUtils;

/**
 * Utility class for generating random Strings.
 */
public final class RandomUtil {

    private static final int DEF_COUNT = 20;

    private RandomUtil() {
    }

    /**
     * Generate a password.
     *
     * @return the generated password
     */
    public static String generatePassword() {
        return RandomStringUtils.randomAlphanumeric(DEF_COUNT);
    }

    /**
     * Generate an activation key.
     *
     * @return the generated activation key
     */
    public static String generateActivationKey() {
        return RandomStringUtils.randomNumeric(DEF_COUNT);
    }

    /**
     * Generate a reset key.
     *
     * @return the generated reset key
     */
    public static String generateResetKey() {
        return RandomStringUtils.randomNumeric(DEF_COUNT);
    }


    public static String cambiaString(String cadena) {
        cadena = cadena.replace("á", "a");
        cadena = cadena.replace("é", "e");
        cadena = cadena.replace("í", "i");
        cadena = cadena.replace("ó", "o");
        cadena = cadena.replace("ú", "u");

        cadena = cadena.replace("Á", "A");
        cadena = cadena.replace("É", "E");
        cadena = cadena.replace("Í", "I");
        cadena = cadena.replace("Ó", "O");
        cadena = cadena.replace("Ú", "U");


        return cadena;
    }
}
